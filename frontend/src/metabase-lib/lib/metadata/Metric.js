import Base from "./Base";
import Database from "./Database";
import Table from "./Table";
import type { Aggregation } from "metabase-types/types/Query";

/**
 * Wrapper class for a metric. Belongs to a {@link Database} and possibly a {@link Table}
 */
export default class Metric extends Base {
  displayName(): string {
    return this.name;
  }

  aggregationClause(): Aggregation {
    return ["metric", this.id];
  }

  /** Underlying query for this metric */
  definitionQuery() {
    return this.definition
      ? this.table.query().setQuery(this.definition)
      : null;
  }

  /** Underlying aggregation clause for this metric */
  aggregation() {
    const query = this.definitionQuery();
    if (query) {
      return query.aggregations()[0];
    }
  }

  /** Column name when this metric is used in a query */
  columnName() {
    const aggregation = this.aggregation();
    if (aggregation) {
      return aggregation.columnName();
    } else if (typeof this.id === "string") {
      // special case for Google Analytics metrics
      return this.id;
    } else {
      return null;
    }
  }

  isActive() {
    return !this.archived;
  }

  /**
   * @private
   * @param {string} name
   * @param {string} description
   * @param {Database} database
   * @param {Table} table
   * @param {number} id
   * @param {StructuredQuery} definition
   * @param {boolean} archived
   */
  _constructor(name, description, database, table, id, definition, archived) {
    this.name = name;
    this.description = description;
    this.database = database;
    this.table = table;
    this.id = id;
    this.definition = definition;
    this.archived = archived;
  }
}
