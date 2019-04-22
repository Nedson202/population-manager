/**
 * Handles queries to the database
 *
 * @class DB
 */
class DB {
  constructor(model) {
    this.model = model;
  }
  /**
   * Create a new record in the collection with model specified
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @returns
   * @memberof DB
   */
  async create(query) {
    try {
      const createdDocument = await this.model.create(query);
      return createdDocument;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Paginate record using mongoose-paginate
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @param {*} query command to processOptions
   * @returns
   * @memberof DB
   */
  async paginateAll(query = {}, queryOptions) {
    try {
      const document = await this.model.paginate(query, queryOptions);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve all records based on specified query
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @returns
   * @memberof DB
   */
  async findAll(query) {
    try {
      const document = await this.model.find(query);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve a record using the record's ID
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @returns
   * @memberof DB
   */
  async findById(query) {
    try {
      const document = await this.model.findById(query);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve a record base on field specified
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} field collection field to read from
   * @param {*} value
   * @returns
   * @memberof DB
   */
  async findOne(field, value) {
    try {
      const retrievedDocument = await this.model.findOne({
        [field]: value
      });
      return retrievedDocument;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Soft delete record(s) from a collection
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @memberof DB
   */
  async deleteMany(query) {
    try {
      await this.model.deleteMany(query);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update database record
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @param {*} data field and data to update
   * @param {*} returnOptions return options for the newly updated document
   * @returns
   * @memberof DB
   */
  async updateOne(query, data, returnOptions) {
    try {
      const updatedDocument = await this.model.findOneAndUpdate(query, data, returnOptions);
      return updatedDocument;
    } catch (error) {
      throw error;
    }
  }
}

export default DB;
