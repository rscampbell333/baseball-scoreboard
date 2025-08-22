import type { Plays } from "./mlbApi/types";

export interface BasesProps {
  plays: Plays;
}

const getFill = (occupied?: boolean) => occupied ? undefined : 'none'

const Bases: React.FC<BasesProps> = ({
  plays,
}) => {
  const { allPlays } = plays;
  const previousPlay = allPlays[allPlays.length - 1].playEndTime 
    ? allPlays[allPlays.length - 1] 
    : allPlays[allPlays.length - 2];

  const first = !!previousPlay.matchup.postOnFirst;
  const second = !!previousPlay.matchup.postOnSecond;
  const third = !!previousPlay.matchup.postOnThird;

  return (
    <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 110">
      <g transform="translate(75 4) rotate(45)">
        <rect width="45" height="45" x="53" y="1" style={{ strokeWidth: "3", stroke: "black" }} fill={getFill(first)}/>
        <rect width="45" height="45" x="1" y="1" style={{ strokeWidth: "3", stroke: "black" }} fill={getFill(second)} />
        <rect width="45" height="45" x="1" y="53" style={{ strokeWidth: "3", stroke: "black" }} fill={getFill(third)}/>
      </g>
    </svg>
  );
};

export default Bases;
