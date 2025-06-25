function MarkdownRenderer({ content }) {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  }
  export default MarkdownRenderer