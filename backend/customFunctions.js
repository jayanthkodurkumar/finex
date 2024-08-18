
function generateUserData(context, events, done) {
  const randomName = `User_${Math.random().toString(36).substring(7)}`;
  const randomEmail = `${randomName}@example.com`;
  const randomPassword = `pass_${Math.random().toString(36).substring(7)}`;

  context.vars.name = randomName;
  context.vars.email = randomEmail;
  context.vars.password = randomPassword;

  return done();
}


function generateExpenses(context, events, done) {
  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Other",
  ];
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const randomDescription = `Expense_${Math.random()
    .toString(36)
    .substring(7)}`;
  const randomAmount = Math.floor(Math.random() * 500) + 50; 

  context.vars.description = randomDescription;
  context.vars.amount = randomAmount;
  context.vars.date = new Date().toISOString(); 
  context.vars.category = randomCategory;

  return done();
}

module.exports = {
  generateUserData,
  generateExpenses,
};
