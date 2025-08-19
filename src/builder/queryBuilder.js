class QueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery; // mongoose query
    this.query = query; // request query params
  }

  // 🔍 Search
  search(fields) {
    if (this.query.search) {
      const regex = new RegExp(this.query.search, "i");
      this.modelQuery = this.modelQuery.find({
        $or: fields.map((field) => ({ [field]: regex })),
      });
    }
    return this;
  }

  // ⚡ Filter
  filter() {
    const queryCopy = { ...this.query };
    const excludeFields = ["search", "page", "limit", "sort", "fields"];
    excludeFields.forEach((field) => delete queryCopy[field]);

    this.modelQuery = this.modelQuery.find(queryCopy);
    return this;
  }

  // ↕️ Sort
  sort() {
    if (this.query.sort) {
      this.modelQuery = this.modelQuery.sort(
        this.query.sort.split(",").join(" ")
      );
    } else {
      this.modelQuery = this.modelQuery.sort("-createdAt");
    }
    return this;
  }

  // 📃 Field limiting
  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(",").join(" ");
      this.modelQuery = this.modelQuery.select(fields);
    } else {
      this.modelQuery = this.modelQuery.select("-__v");
    }
    return this;
  }

  // 📌 Pagination
  paginate() {
    const page = parseInt(this.query.page) || 1;
    const limit = parseInt(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // ✅ Execute query
  async exec() {
    return await this.modelQuery;
  }
}

module.exports = QueryBuilder;
