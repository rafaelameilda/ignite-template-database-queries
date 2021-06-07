import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const gamesQuery = this.repository
      .createQueryBuilder("g")
      .where("1=1")
      .andWhere(`g.title ILIKE '%${param}%'`);

    const games = await gamesQuery.getMany();

    return games;

    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(title) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("user_game_game")
      .relation(Game, "users")
      .of(id)
      .loadMany();
    // Complete usando query builder
  }
}
