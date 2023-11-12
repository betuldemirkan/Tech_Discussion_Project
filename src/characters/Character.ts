export type Position = { x: number; y: number };

export abstract class Character {
    position: Position;
    symbol: string;
    type: String;

    constructor(symbol: string, type: String) {
        this.position = { x: 0, y: 0 };
        this.symbol = symbol;
        this.type = type;
    }

    setPosition(position: Position) {
        this.position = position;
    }

    getPosition(): Position {
        return this.position;
    }
}