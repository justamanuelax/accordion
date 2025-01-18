import PropTypes from "prop-types"; // PropTypes is used for type-checking props passed to components.
import "./style.css"; // Importing the CSS for styling.
import { useState } from "react"; // useState is a React Hook for managing state in functional components.

// Array of FAQ objects with title and text properties.
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

// Main App component
function App() {
  return (
    <div>
      {/* Rendering the Accordion component and passing FAQ data as props */}
      <Accordion data={faqs} />
    </div>
  );

  // Accordion component: Manages and renders multiple AccordionItem components.
  function Accordion({ data }) {
    // State to track the currently open AccordionItem (default is 0, the first item).
    const [curOpen, setIsOpen] = useState(0);

    // Adding PropTypes for type-checking the data prop.
    Accordion.propTypes = {
      data: PropTypes.array
    };

    return (
      <div className="accordion">
        {/* Mapping over the data array to create AccordionItem components */}
        {data.map((el, i) => (
          <AccordionItem
            key={i} // Unique key for each child in the list.
            title={el.title} // Passing title as a prop.
            num={i} // Index number of the current item.
            curOpen={curOpen} // Current open index passed as a prop.
            onIsOpen={setIsOpen} // Function to update the current open index.
          >
            {el.text} {/* Passing the text as children */}
          </AccordionItem>
        ))}
      </div>
    );
  }

  // AccordionItem component: Represents an individual item in the accordion.
  function AccordionItem({ num, title, children, onIsOpen, curOpen }) {
    // Adding PropTypes for type-checking props.
    AccordionItem.propTypes = {
      num: PropTypes.number,
      title: PropTypes.string,
      text: PropTypes.string,
      onIsOpen: PropTypes.func,
      curOpen: PropTypes.number,
      children: PropTypes.array 
    };
    
    // Boolean to check if the current item is open.
    const isOpen = num === curOpen;

    // Function to handle the toggle of the accordion item.
    function handleToggle() {
      onIsOpen(num); // Updates the state in the parent Accordion component.
    }

    return (
      <>
        {/* Accordion item container with dynamic class for open/closed state */}
        <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
          {/* Displaying the item number */}
          <p className="num">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
          {/* Displaying the item title */}
          <p className="text">{title}</p>
          {/* Displaying an icon that toggles based on open/closed state */}
          <p className="icon">{isOpen ? "-" : "+"}</p>
          {/* Content box shown only if the item is open */}
          {isOpen && <div className="content-box">{children}</div>}
        </div>
      </>
    );
  }
}

export default App;
