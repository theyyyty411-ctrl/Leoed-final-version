import { JSDOM } from "jsdom";
import mathjax from "./mathjax/node-main.mjs";

export async function convert2mml(htmlInput) {
  try {
    // 1. Initialize MathJax with your delimiter rules
    const MathJax = await mathjax.init({
      loader: { load: ["input/tex"] },
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\[", "\\]"],
        ],
      },
      startup: { typeset: false },
    });

    const dom = new JSDOM(htmlInput);
    const document = dom.window.document;

    // 2. Audit and compile text nodes containing any of our target math characters
    const textNodesToProcess = [];
    const walker = document.createTreeWalker(
      document.body,
      dom.window.NodeFilter.SHOW_TEXT,
      null,
      false,
    );

    let current = walker.nextNode();
    while (current) {
      const val = current.nodeValue;
      // Catch occurrences of $, \[, or \( indicators
      if (
        val &&
        (val.includes("$") || val.includes("\\[") || val.includes("\\("))
      ) {
        textNodesToProcess.push(current);
      }
      current = walker.nextNode();
    }

    // 3. Map starting markers directly to their matching closing twins and formatting targets
    const delimiterRules = [
      { start: "$$", end: "$$", display: true },
      { start: "$", end: "$", display: false },
      { start: "\\[", end: "\\]", display: true },
      { start: "\\(", end: "\\)", display: false },
    ];

    // 4. Tokenize strings manually with sequential index evaluations
    for (const node of textNodesToProcess) {
      let text = node.nodeValue;
      const parent = node.parentNode;
      if (!parent) continue;

      let referenceNode = node;

      while (text.length > 0) {
        let earliestRule = null;
        let earliestIndex = -1;

        // Pinpoint which configured delimiter pair starts earliest in the string sequence
        for (const rule of delimiterRules) {
          const idx = text.indexOf(rule.start);
          if (idx !== -1) {
            if (earliestIndex === -1 || idx < earliestIndex) {
              earliestIndex = idx;
              earliestRule = rule;
            }
          }
        }

        // Case A: No further layout markers identified; dump the remainder as static content
        if (!earliestRule) {
          const trailingText = document.createTextNode(text);
          parent.insertBefore(trailingText, referenceNode.nextSibling);
          break;
        }

        // Case B: Deliver isolated text segments up to the start point of our math token
        if (earliestIndex > 0) {
          const leadingText = text.substring(0, earliestIndex);
          const textNode = document.createTextNode(leadingText);
          parent.insertBefore(textNode, referenceNode.nextSibling);
          referenceNode = textNode;
          text = text.substring(earliestIndex);
        }

        // Advance track past the matched open delimiter token length
        const startDelimLen = earliestRule.start.length;
        const bodyText = text.substring(startDelimLen);
        const closeIndex = bodyText.indexOf(earliestRule.end);

        // Handle orphaned/unclosed boundary tokens gracefully
        if (closeIndex === -1) {
          const fallbackNode = document.createTextNode(text);
          parent.insertBefore(fallbackNode, referenceNode.nextSibling);
          break;
        }

        // Isolate the true internal TeX formula payload expression
        const latexFormula = bodyText.substring(0, closeIndex);

        // Run data directly through the official conversion method
        const mmlString = MathJax.tex2mml(latexFormula.trim(), {
          display: earliestRule.display,
        });

        // Unpack the resulting string string into safe XML DOM tree objects
        const template = document.createElement("template");
        template.innerHTML = mmlString.trim();
        const mmlNode = template.content.firstChild;

        parent.insertBefore(mmlNode, referenceNode.nextSibling);
        referenceNode = mmlNode;

        // Move our processing cursor forward past the matched closing delimiter
        text = bodyText.substring(closeIndex + earliestRule.end.length);
      }

      // Remove original text container placeholder references
      parent.removeChild(node);
    }

    return dom.serialize();
  } catch (error) {
    console.error("Delimiter compilation phase encountered an error:", error);
    return htmlInput;
  }
}
