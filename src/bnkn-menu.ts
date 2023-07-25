import * as Bnkn from "./bnkn";

export const BNKN_MENU = new Map();
BNKN_MENU.set("fix-dumb-quotes", Bnkn.fixDumbQuotes);
BNKN_MENU.set("format-horizontal-bars", Bnkn.formatHorizontalBars);
BNKN_MENU.set("format-punctuation", Bnkn.formatPunctuation);
BNKN_MENU.set("swap-familyname-position", Bnkn.swapHumanNamePosition);
BNKN_MENU.set("to-double-brackets", Bnkn.toDouble);
BNKN_MENU.set("to-full-width", Bnkn.toFullWidth);
BNKN_MENU.set("to-full-width-brackets", Bnkn.toFullWidthBracket);
BNKN_MENU.set("to-half-width", Bnkn.toHalfWidth);
BNKN_MENU.set("to-half-width-brackets", Bnkn.toHalfWidthBracket);
BNKN_MENU.set("to-single-brackets", Bnkn.toSingle);
BNKN_MENU.set("to-to-tortoise-brackets", Bnkn.toTortoiseBracket);
BNKN_MENU.set("toggle-Comma-type", Bnkn.toggleCommaType);
BNKN_MENU.set("toggle-Oxford-comma", Bnkn.toggleOxfordComma);
BNKN_MENU.set("trim-brackets", Bnkn.trimBrackets);