import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="header-text">
        <h1 className="header-heading">Trello</h1>
        <h2 className="header-sub">Log in to Continue</h2>
      </div>
      <NavBar />
    </div>
  );
}

function NavBar() {
  return <nav>test</nav>;
}

function Main() {
  return (
    <div className="items-container">
      <List />
    </div>
  );
}

function List() {
  const initialItems = [
    { name: "Todo", results: [], id: "todo" },
    { name: "Doing", results: [], id: "doing" },
    { name: "Done", results: [], id: "done" },
  ];
  return (
    <ul className="list">
      {initialItems.map((item) => (
        <ListItems item={item} key={item.id} />
      ))}
    </ul>
  );
}

function ListItems({ item }) {
  const [results, setResults] = useState([]);
  // const results = item.results;
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  function handleShowModal() {
    setShowModal(!showModal);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: item.name + Date.now(),
      title,
      description,
      publisher,
    };
    setResults([...results, newItem]);
    setShowModal(false);

    console.log(newItem);
  }
  console.log(results[0]?.id.includes("Todo"));

  return (
    <li className="list-item">
      <h3 className="item-header">{item.name}</h3>
      <Results results={results} />
      <div className="add-card-container">
        <div className="icon">+</div>
        <button className="btn add-card-btn" onClick={handleShowModal}>
          Add new card
        </button>
      </div>
      {results[0]?.id.includes("Todo") && (
        <p style={{ fontSize: "15px", color: "red" }}>
          You have {results.length} left todo
        </p>
      )}
      {results[0]?.id.includes("Doing") && (
        <p style={{ fontSize: "15px", color: "red" }}>
          You have {results.length} works doing right now
        </p>
      )}
      {results[0]?.id.includes("Done") && (
        <p style={{ fontSize: "15px", color: "red" }}>
          You have {results.length} works done already.
        </p>
      )}

      {showModal && (
        <div className="add-card-window form todo-add ">
          <button
            onClick={handleShowModal}
            className="btn--close-modal"
            id="todo-btn-close-form"
          >
            &times;
          </button>
          <form className="todo-upload" onSubmit={handleSubmit}>
            <div className="upload__column">
              <h3 className="upload__heading">{item.name}-Card info</h3>
              <label>Title</label>
              <input
                value={title}
                placeholder="Title"
                required
                name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                name="description"
                type="text"
              />
              <label>Publisher</label>
              <input
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Publisher"
                required
                name="publisher"
                type="text"
              />
              <button className="btn-sub"> ADD </button>
              {/* <input type="submit" placeholder="Submit"  */}
            </div>
          </form>
        </div>
      )}
    </li>
  );
}

function Results({ results }) {
  console.log(results);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="results">
      {results.map((result) => (
        <div
          className="result-card"
          key={result.id}
          onClick={() => setShowModal(!showModal)}
        >
          <h3 className="card-header">{result.title}</h3>
          {showModal && (
            <div className="card-modal modal ">
              <button
                onClick={() => setShowModal(false)}
                className="close-modal"
              >
                &times;
              </button>

              <h4 className="card-modal-header">{result.title}</h4>
              <p className="card-modal-info">{result.description}</p>
              <p className="card-modal-publisher">{result.publisher}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
