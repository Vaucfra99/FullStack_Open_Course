const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const SubHeader = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, id) => (
        <Part key={id} part={part} />
      ))}
      <Total parts={parts} />
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return <p>Total of {total} exercises</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      <Header text="Web development curriculum" />
      {courses.map((course) => (
        <div key={course.id}>
          <SubHeader courseName={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
