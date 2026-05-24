function LessonList({ lessons }) {
  return (
    <>
      <h2>Lessons</h2>

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{lesson.title}</h3>
          <p>{lesson.description}</p>
        </div>
      ))}
    </>
  );
}

export default LessonList;