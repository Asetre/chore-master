String.prototype.slugify = function() {
  return this.toLowerCase().replace(' ', '-')
}

module.exports = function(TeamRepository, ) {
  return {
    createTeam: (name, userID) => {
      //todo: check if user has created the maximum allowed teams
      //todo: check if the user is allowed to create teams

      let slug = name.slugify()
      let newTeam = {
        name,
        slug,
        members: [userID],
        leaders: [userID],
        created_at: new Date().toISOString()
      }

      return TeamRepository.createTeam(newTeam)
    },
  }
}