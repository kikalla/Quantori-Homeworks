const MarkIcon: React.FC<{ active: boolean }> = (props) => {
  const activeClass = props.active ? "--active" : "";

  return (
    <svg
      className={`completed-tasks__check completed-tasks__check${activeClass}`}
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 7.005L5.40476 10.3417L12.725 2"
        stroke="white"
        strokeWidth="2.38333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MarkIcon;
