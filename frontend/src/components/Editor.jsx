import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../quill-custom.css";

const Editor = ({ content, setContent, color, countWords, editorRef }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
    ],
  };

  const isDark = localStorage.getItem("theme") === "dark";

  const bgColor = isDark ? "#374151" : color;

  return (
    <div
      className="editor-container"
      style={{ backgroundColor: bgColor || color }}
    >
      <ReactQuill
        theme="snow"
        value={content}
        ref={editorRef}
        onChange={(value) => {
          setContent(value);
          countWords(value);
        }}
        placeholder="Type here..."
        modules={modules}
        style={{
          backgroundColor: bgColor || color,
        }}
      />
    </div>
  );
};

export default Editor;
