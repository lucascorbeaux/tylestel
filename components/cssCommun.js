import { css } from "https://unpkg.com/lit?module";

export const titreCss = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "Spectral SC", serif;
  }

  h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #782e22;
    font-weight: normal;
  }
`;

export const buttonCss = css`
  button {
    background-color: white;
    border: none;
    flex: 1;
    padding: 0.2rem;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }

  button:hover {
    background-color: rgba(255, 220, 180, 0.9);
  }

  button.active {
    background-color: rgba(255, 220, 180, 0.7);
  }
`;

export const cardCss = css`
  .card {
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
      rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    background-color: white;
  }
  
  .card header {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
  }

  .card article {
    display: flex;
    justify-content: space-between;
  }
`;

export const icons = css`
  .fas {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
  }

  .fa-trash::before {
    content: "\\f1f8";
  }

  .fa-edit::before {
    content: "\\f044";
  }

  .fa-hand-back-fist::before {
    content: "\\f255";
  }

  .fa-hand-back-fist::before {
    content: "\\f255";
  }

  .fa-suitcase::before {
    content: "\\f0f2";
  }

  .fa-shirt::before {
    content: "\\f553";
  }
`;