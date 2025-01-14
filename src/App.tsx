import React, { useState, useRef } from "react";
import {
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Download,
  FileDown
} from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';

const App = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");

  const formatDoc = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
  };

  const exportToDocx = async () => {
    if (editorRef.current) {
      const content = editorRef.current.innerText;
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(content),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${documentTitle}.docx`);
    }
  };

  const exportToPDF = () => {
    if (editorRef.current) {
      const element = editorRef.current;
      const opt = {
        margin: [0.75, 0.75, 0.75, 0.75],
        filename: `${documentTitle}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="text-xl font-semibold text-gray-900 border-none focus:outline-none focus:ring-0 bg-transparent"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={exportToDocx}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FileDown className="h-4 w-4" />
                Export DOCX
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto p-4">
        <div className="bg-white shadow-sm rounded-lg">
          {/* Toolbar */}
          <div className="border-b border-gray-200 p-2 flex items-center gap-2">
            <button
              onClick={() => formatDoc('bold')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatDoc('italic')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatDoc('underline')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <button
              onClick={() => formatDoc('justifyLeft')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatDoc('justifyCenter')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatDoc('justifyRight')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatDoc('justifyFull')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <button
              onClick={() => formatDoc('formatBlock', '<h1>')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatDoc('formatBlock', '<h2>')}
              className="p-2 hover:bg-gray-100 rounded"
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <select
              onChange={(e) => formatDoc('fontName', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="Times New Roman">Times New Roman</option>
              <option value="Arial">Arial</option>
              <option value="Calibri">Calibri</option>
            </select>
            <select
              onChange={(e) => formatDoc('fontSize', e.target.value)}
              className="p-2 border rounded"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Editor */}
          <div
            ref={editorRef}
            className="min-h-[29.7cm] w-[21cm] mx-auto my-8 p-[2.54cm] border border-gray-200 shadow-sm"
            contentEditable
            style={{
              fontFamily: 'Times New Roman',
              fontSize: '11pt',
              lineHeight: '1.5',
              outline: 'none',
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;