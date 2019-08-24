module.exports = ({
  mongoose,
}) => ({
  createModel: (name, schema) => mongoose.model(name, schema),
});
