import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props) {
  return <ReactMarkdown>{props.recipe}</ReactMarkdown>;
}
