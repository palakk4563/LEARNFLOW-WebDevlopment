import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  // const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
        // console.log(code);
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        // console.log("receiving", code);
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
  return <textarea id="realtimeEditor"></textarea>;
};
export default Editor;

// const Editor = () => {
//   const textareaRef = useRef(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     editorRef.current = Codemirror.fromTextArea(textareaRef.current, {
//       mode: { name: "javascript", json: true },
//       theme: "dracula",
//       autoCloseTags: true,
//       autoCloseBrackets: true,
//       lineNumbers: true,
//     });

//     return () => {
//       editorRef.current.toTextArea(); // Convert back to a plain textarea when component unmounts
//     };
//   }, []);

//   return <textarea ref={textareaRef} id="realtimeEditor" />;
// };

// export default Editor;
