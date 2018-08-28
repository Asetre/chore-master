String.prototype.slugify = function () {
  this.toLocaleLowerCase()
  let escapeRegexChars = this.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
  return escapeRegexChars.replace(new RegExp(' ', 'g'), '-');
}

module.exports = function (UserRepository) {
  return {
    createUser: async (name, authInfo, teamID) => {
      let authID = authInfo ? authInfo : ''

      let newUser = {
        name,
        slug: name.slugify(),
        created_at: new Date().toISOString()
      }
      //If user is created through auth0
      //Check for duplicate user
      if (authID.length > 0) {
        let foundUser = await UserRepository.findByAuthID(authID)
        //todo: custom err
        if (foundUser) throw ('Duplicate User')

        newUser.authID = authID
      }
      if (teamID) {
        newUser.teams = [teamID]
      }

      return UserRepository.createUser(newUser)
    }
  }
}