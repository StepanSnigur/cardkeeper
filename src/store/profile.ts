import { makeAutoObservable } from "mobx";

class Profile {
  email: string | null = null
  avatar: string | null = null
  userId: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setUserId(id: string) {
    this.userId = id
  }
  setEmail(email: string) {
    this.email = email
  }
  setAvatar(avatar: string) {
    this.avatar = avatar
  }
}

export default new Profile()
