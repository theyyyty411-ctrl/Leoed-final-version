import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_from_xml(z, xml_path, namespaces):
    try:
        xml_content = z.read(xml_path)
        root = ET.fromstring(xml_content)
        
        full_text = []
        
        # Iterate over all elements to preserve some order
        # Paragraphs, tables, etc.
        for elem in root.iter():
            if elem.tag == '{%s}p' % namespaces['w']:
                para_text = []
                for r in elem.findall('.//w:r', namespaces):
                    rPr = r.find('w:rPr', namespaces)
                    is_strike = False
                    if rPr is not None:
                        strike = rPr.find('w:strike', namespaces)
                        if strike is not None:
                            val = strike.get('{%s}val' % namespaces['w'])
                            if val != 'false':
                                is_strike = True
                    
                    t = r.find('w:t', namespaces)
                    if t is not None and t.text:
                        text = t.text
                        if is_strike:
                            para_text.append(f"[STRIKETHROUGH: {text}]")
                        else:
                            para_text.append(text)
                if para_text:
                    full_text.append("".join(para_text))
            
            # Simple table handling: just get the text from paragraphs inside cells
            # (Iterating over all 'p' already catches these, but we might want to distinguish tables)
            # Actually, root.iter() will hit the 'p' tags inside tables anyway.
            # To avoid duplicates, we can just use the para logic and let it catch everything.
            
        return "\n".join(full_text)
    except KeyError:
        return "" # File doesn't exist in zip
    except Exception as e:
        return f"Error in {xml_path}: {str(e)}"

def extract_docx_text(docx_path):
    namespaces = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    
    try:
        with zipfile.ZipFile(docx_path) as z:
            results = []
            
            # Document body
            doc_text = extract_from_xml(z, 'word/document.xml', namespaces)
            if doc_text:
                results.append(doc_text)
            
            # Headers and Footers
            for i in range(1, 10):
                h = extract_from_xml(z, f'word/header{i}.xml', namespaces)
                if h:
                    results.insert(0, f"--- Header {i} ---\n{h}")
                f = extract_from_xml(z, f'word/footer{i}.xml', namespaces)
                if f:
                    results.append(f"--- Footer {i} ---\n{f}")
            
            # Footnotes
            fn = extract_from_xml(z, 'word/footnotes.xml', namespaces)
            if fn:
                results.append(f"--- Footnotes ---\n{fn}")
            
            # Endnotes
            en = extract_from_xml(z, 'word/endnotes.xml', namespaces)
            if en:
                results.append(f"--- Endnotes ---\n{en}")
                
            return "\n\n".join(results)
            
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    path = "/Users/leolam/Desktop/leoed final version/src/images/Leo Education _ Adaptive AI DSE Portal.docx"
    print(extract_docx_text(path))
