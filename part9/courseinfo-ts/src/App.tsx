interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartWithDescription {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartWithRequirements extends CoursePartWithDescription {
  requirements: string[];
  kind: "special"
}


type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartWithRequirements;

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (<div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <i>{part.description}</i>
      </div>
      )
    case "group":
      return (<div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <i>project exercises {part.groupProjectCount}</i>
      </div>
      )
    case "background":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i>
          <p>submit to <a href={part.backroundMaterial}>{part.backroundMaterial}</a></p>
        </div>
      )
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(",")}</p>
        </div>
      )
    default:
      return <p>dmmy</p>
  }
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={total} />
    </div>
  );
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
}

const Content = ({ content }: { content: Array<CoursePart> }) => {
  return (
    <>
      {content.map(part => <Part key={part.name} part={part} />)}
    </>
  )
}

const Total = ({ total }: { total: number }) => {
  return (
    <p>
      Number of exercises{" "}
      {total}
    </p>
  )
}

type Part = {
  name: string,
  exerciseCount: number
}

export default App;
