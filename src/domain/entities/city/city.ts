import { v4 as uuid } from "uuid";

export class City {
  private _id: string;
  private _name: string;
  private _population: number;
  private _state: string;
  private _group: number;

  private _updateAt: Date;

  constructor(name: string, population: number, state: string, id?: string) {
    this._name = name;
    this._population = population;
    this._state = state;
    this._id = id ? id : uuid();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get population(): number {
    return this._population;
  }

  public get state(): string {
    return this._state;
  }

  // Setters
  public set name(value: string) {
    this._name = value;
  }
  public get updateAt(): Date {
    return this._updateAt;
  }

  // Setters
  public set updateAt(value: Date) {
    this._updateAt = value;
  }
  public set group(value: number) {
    this._group = value;
  }
  public get group(): number {
    if (!this._group) {
      let value;
      switch (true) {
        case this.population <= 20000:
          value = 1;
          break;
        case this.population <= 100000:
          value = 2;
          break;
        case this.population < 1000000:
          value = 3;
          break;
        default:
          value = 4;
      }

      this._group = value;
    }
    return this._group;
  }

  public getWeightByPopulation(): number {
    const group = this.group;
    switch (group) {
      case 1:
        return 0.5;
      case 2:
        return 1;
      case 3:
        return 1.5;
      default:
        return 2;
    }
  }

  public set state(value: string) {
    this._state = value;
  }
}
