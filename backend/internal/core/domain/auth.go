package domain

type RegisterRequest struct {
	Name string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	ID       int    `gorm:"column:id" json:"id"`
	Name string `gorm:"column:name" json:"name"`
	Email	string `gorm:"column:email" json:"email"`
	Password string `gorm:"column:password" json:"password"`
	CreatedAt string `gorm:"column:created_at" json:"created_at"`
	UpdatedAt string `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt string `gorm:"column:deleted_at" json:"deleted_at"`
}