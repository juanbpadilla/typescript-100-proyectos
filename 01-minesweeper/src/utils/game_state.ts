const default_game_state = {
  mines: 10,
  chances: 1
}

export let game_state = {
  mines: 10,
  chances: 1
}

export const game_utils = {
  MINE_ICON: "💥",
  FLAG_ICON: "🚩",
  QUESTION_MARK_ICON: "?",
  COLORS: {
    STATE_BACKGROUND: ['#63B3FF', '#F7D237', '#91C952']
  }
}

export function restoreState() {
  game_state = { ...default_game_state }
}