function VocabularyList({ vocabulary }) {
  return (
    <>
      <h2 style={{ marginTop: "40px" }}>Vocabulary</h2>

      {vocabulary.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.word}</h3>
          <p>{item.meaning}</p>
        </div>
      ))}
    </>
  );
}

export default VocabularyList;