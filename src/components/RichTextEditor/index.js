import React, { useRef, useState, useCallback } from "react";
import { Box, Tooltip, ToggleButtonGroup, ToggleButton } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Typography } from "../Wrappers";
import katex from "katex";
import "katex/dist/katex.min.css";

const renderLatex = (formula, isDisplay) => {
  try {
    return katex.renderToString(formula, {
      throwOnError: false,
      displayMode: isDisplay,
      output: "html",
      leqno: false,
      fleqn: false,
      strict: false,
    });
  } catch (e) {
    const className = isDisplay ? "latex-display" : "latex-inline";
    return `<span class="${className}">${formula}</span>`;
  }
};

const renderPreview = (html) => {
  if (!html) return "";
  
  // First, decode HTML entities to get plain text
  let text = html
    .replace(/&nbsp;/gi, " ")
    .replace(/&ensp;/gi, " ")
    .replace(/&emsp;/gi, " ")
    .replace(/&thinsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/&#xA0;/gi, " ")
    .replace(/&/gi, "&")
    .replace(/</gi, "<")
    .replace(/>/gi, ">")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  
  // Convert newlines to <br>
  text = text.replace(/\n/g, "<br>");
  
  // Render LaTeX delimiters
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, formula) => renderLatex(formula.trim(), true));
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula) => renderLatex(formula.trim(), true));
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, formula) => renderLatex(formula.trim(), false));
  text = text.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (_, formula) => renderLatex(formula.trim(), false));
  
  return text;
};

const RichTextEditor = ({ value, onChange, label, minRows = 3, maxRows = 6 }) => {
  const [mode, setMode] = useState("raw");
  const [editorMode, setEditorMode] = useState("raw");
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleModeChange = (event, newMode) => {
    if (newMode === null) return;
    
    // If switching to preview, keep the current editor mode
    // If switching from preview to editor, update both modes
    if (newMode === "preview") {
      setMode(newMode);
    } else {
      setMode(newMode);
      setEditorMode(newMode);
    }
  };

  const handleRawInput = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleQuillChange = useCallback((html) => {
    onChange(html);
  }, [onChange]);

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle image upload and insert into Quill
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !quillRef.current) return;

    try {
      const base64 = await fileToBase64(file);
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      
      quill.insertEmbed(range.index, "image", base64);
      quill.setSelection(range.index + 1);
      
      // Trigger onChange by getting the HTML
      onChange(quill.root.innerHTML);
    } catch (err) {
      console.error("Failed to upload image:", err);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Custom toolbar with image upload button
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        // Override image handler to use base64
        image: () => {
          fileInputRef.current?.click();
        },
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "color",
    "background",
    "link",
    "image",
  ];

  const showPreview = mode === "preview";

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="body2" color="textSecondary">{label}</Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange} size="small">
            <ToggleButton value="raw" aria-label="raw html">
              <Tooltip title="Raw HTML"><CodeIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="rich" aria-label="rich editor">
              <Tooltip title="Rich editor (Quill)"><VisibilityIcon fontSize="small" /></Tooltip>
            </ToggleButton>
            <ToggleButton value="preview" aria-label="preview">
              <Tooltip title="Preview"><VisibilityIcon fontSize="small" sx={{ fontWeight: "bold" }} /></Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box display="flex" gap={1}>
        {/* Editor section - always visible, shows the current editor mode */}
        <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {editorMode === "raw" && (
            <Box component="textarea" value={value} onChange={handleRawInput} placeholder="Enter HTML content..." sx={{ width: "100%", flex: 1, p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 1, fontFamily: "Consolas, 'Courier New', monospace", fontSize: "0.875rem", lineHeight: 1.5, resize: "vertical", outline: "none", minHeight: minRows * 24, "&:focus": { borderColor: "primary.main", boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}` } }} />
          )}

          {editorMode === "rich" && (
            <Box sx={{ flex: 1, border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden", display: "flex", flexDirection: "column", "& .ql-toolbar": { border: "none", borderBottom: "1px solid", borderColor: "divider", borderRadius: 0, flexShrink: 0 }, "& .ql-container": { flex: 1, border: "none", borderRadius: 0, overflowY: "auto", fontSize: "0.875rem", display: "flex", flexDirection: "column" }, "& .ql-editor": { flex: 1, overflowY: "auto", minHeight: minRows * 24, padding: "8px 12px" } }}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                placeholder="Type here..."
                bounds={".ql-container"}
                preserveWhitespace={true}
                useSemanticHTML={false}
              />
              {/* Hidden file input for image upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Box>
          )}
        </Box>

        {/* Preview section - only shown when preview mode is active */}
        {showPreview && (
          <Box sx={{ flex: 1, minWidth: 0, overflowY: "auto", p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 1, fontFamily: '"Cambria Math", "Latin Modern Math", "STIX", serif', fontSize: "1rem", lineHeight: 1.6, "& .katex-display": { display: "block", textAlign: "center", padding: "12px 8px", margin: "8px 0", backgroundColor: "action.hover", borderRadius: 1, overflowX: "auto", overflowY: "hidden" }, "& .katex": { fontFamily: '"Cambria Math", "Latin Modern Math", "STIX", "KaTeX_Main", serif', fontSize: "1.05em" } }} dangerouslySetInnerHTML={{ __html: renderPreview(value) }} />
        )}
      </Box>
    </Box>
  );
};

export default RichTextEditor;