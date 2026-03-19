package domain

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	ID         int            `gorm:"column:id;primaryKey" json:"id"`
	UserID     int            `gorm:"column:user_id" json:"user_id"`
	CategoryID int            `gorm:"column:category_id" json:"category_id"`
	Amount     float64        `gorm:"column:amount" json:"amount"`
	Note       string         `gorm:"column:note" json:"note"`
	Date       time.Time      `gorm:"column:date" json:"date"`
	CreatedAt  time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt  time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
}

// SummaryResponse คือ response สำหรับการดึงธุรกรรมแบบ daily / monthly / yearly
type SummaryResponse struct {
	FilterType   string         `json:"filter_type"` // daily | monthly | yearly
	Period       string         `json:"period"`      // 2026-03-19 | 2026-03 | 2026
	Transactions []*Transaction `json:"transactions"`
	TotalIncome  float64        `json:"total_income"`
	TotalExpense float64        `json:"total_expense"`
	Balance      float64        `json:"balance"`
}
