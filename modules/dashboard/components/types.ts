export interface User {
User: string
email: string
image: string
role: string
createdAt: Date
updatedAt: Date
}
export interface Project {
id: string
title: string
description: string
template: string
createdAt: Date
updatedAt: Date
userId: string
user: User
Starmark: { isMarked: boolean }[]
}