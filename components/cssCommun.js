import { css } from "https://unpkg.com/lit?module";

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
`;
