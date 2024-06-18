import React, { useLayoutEffect, useRef, useState } from "react";
import CommentForm from "./CommentForm";
import {
  GhostHighlight,
  PdfSelection,
  usePdfHighlighterContext,
} from "react-pdf-highlighter-extended";
import "./style/ExpandableTip.css";

interface ExpandableTipProps {
  addHighlight: (highlight: GhostHighlight, comment: string) => void;
  doi: string;
}

const ExpandableTip = ({ addHighlight, doi }: ExpandableTipProps) => {
  const [compact, setCompact] = useState(true);
  const selectionRef = useRef<PdfSelection | null>(null);

  const {
    getCurrentSelection,
    removeGhostHighlight,
    setTip,
    updateTipPosition,
  } = usePdfHighlighterContext();

  useLayoutEffect(() => {
    updateTipPosition!();
  }, [compact]);

  return (
    <div className="Tip">
      {compact ? (
        <>
          <button
            className="Tip__compact"
            onClick={() => {
              setCompact(false);
              selectionRef.current = getCurrentSelection();
              selectionRef.current!.makeGhostHighlight();
            }}
          >
            Add highlight
          </button>
          <button
            className="Tip__compact"
            onClick={async () => {
              setCompact(false);
              selectionRef.current = getCurrentSelection();
              selectionRef.current!.makeGhostHighlight();
            try {
                const response = await fetch('/api/explain', {
                    method: 'POST',
                    body: JSON.stringify({ currentSelection: getCurrentSelection(), namespace: doi }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                }
            } catch (error) {
                console.error(error)
                throw new Error("Error: POST request to explain endpoint")
            }
            }}
          >
            Explain
          </button>
        </>
      ) : (
        <CommentForm
          placeHolder="Your comment..."
          onSubmit={(input) => {
            addHighlight(
              {
                content: selectionRef.current!.content,
                position: selectionRef.current!.position,
              },
              input,
            );

            removeGhostHighlight();
            setTip(null);
          }}
        />
      )}
    </div>
  );
};

export default ExpandableTip;
