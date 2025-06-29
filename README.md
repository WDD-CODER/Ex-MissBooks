# MissBooks

A modern React-based book management application for browsing, adding, editing, and viewing book details.  
This project demonstrates best practices in React component structure, state management, and UI/UX design.

---

## Features

- **Book List & Details:**  
  Browse a list of books, view detailed information, and see cover images (with fallback for missing images).

- **Add & Edit Books:**  
  Create new books or edit existing ones using a modern, accessible form with validation.

- **Navigation:**  
  Intuitive navigation between book list, details, and edit/create screens.

- **Responsive UI:**  
  Clean, modern, and responsive design using custom CSS and Font Awesome icons.

- **Error Handling & Logging:**  
  Improved logging for debugging and user feedback.

- **Custom Theming:**  
  Includes a custom VS Code color theme for a consistent development experience.

---

## Recent Enhancements

- Refactored `BookEdit.jsx` for a direct, user-friendly form experience.
- Added an "Add Book" button to `BookList.jsx` for quick access to the creation form.
- Improved logging in `BookPreview.jsx` for easier debugging.
- Enhanced styles in `BookDetails.css`, `BookList.css`, `BookPreview.css`, and `forms.css` for a modern look.
- Updated `BookPreview.css` for improved layout, image handling, and responsive design:
  - Uses CSS Grid areas for header, price, image, description, and actions.
  - Ensures images have a maximum width and rounded corners.
  - Improved `.price` and `.actions` layout for better alignment.
- Added a fallback image (`noImg.png`) for books without cover images.
- Updated VS Code settings for a custom color theme.
- Changed the default route to `/books/edit` for a streamlined workflow.
- Fixed minor logic and formatting issues in `BookIndex.jsx`.
- Integrated Font Awesome 6.7.2 for scalable vector icons.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/missbooks.git
   cd missbooks