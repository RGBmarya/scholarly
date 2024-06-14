import { Highlight } from "react-pdf-highlighter-extended";

export interface CommentedHighlight extends Highlight {
  comment?: string;
}
