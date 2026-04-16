import chefClaude from "./assets/chef-claude-icon.png";

export default function Header() {
  return (
    <header className="header">
      <img src={chefClaude} className="header--image" />
      <h1 className="header--title">Chef Claude</h1>
    </header>
  );
}
