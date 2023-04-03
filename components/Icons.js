import adventure from "@/public/assets/icons/adventure.svg";
import arcade from "@/public/assets/icons/arcade.svg";
import board from "@/public/assets/icons/board.svg";
import classics from "@/public/assets/icons/classics.svg";
import junior from "@/public/assets/icons/junior.svg";
import puzzles from "@/public/assets/icons/puzzle.svg";
import sports from "@/public/assets/icons/sports.svg";
import strategy from "@/public/assets/icons/strategy.svg";

export default function Icons(name) {
  switch (name) {
    case "Adventure":
      return adventure;
    case "Arcade":
      return arcade;

    case "Board":
      return board;

    case "Classics":
      return classics;

    case "Junior":
      return junior;

    case "Puzzles":
      return puzzles;

    case "Sports":
      return sports;

    case "Strategy":
      return strategy;

    default:
      break;
  }
}
