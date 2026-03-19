package service

import (
	"context"
	"time"

	"tracker/internal/core/domain"
	"tracker/internal/core/ports"
)

type TransactionService struct {
	transactionRepo ports.TransactionRepository
}

func NewTransactionService(transactionRepo ports.TransactionRepository) *TransactionService {
	return &TransactionService{transactionRepo: transactionRepo}
}

// GetSummaryByUserID ดึงธุรกรรมพร้อมสรุป รายรับ รายจ่าย ยอดคงเหลือ
// filterType: "daily" | "monthly" | "yearly"
// amount > 0 = รายรับ, amount < 0 = รายจ่าย
func (s *TransactionService) GetSummaryByUserID(ctx context.Context, userID int, filterType string, date time.Time) (*domain.SummaryResponse, error) {
	var start, end time.Time
	var period string

	switch filterType {
	case "monthly":
		start = time.Date(date.Year(), date.Month(), 1, 0, 0, 0, 0, date.Location())
		end = start.AddDate(0, 1, 0)
		period = date.Format("2006-01")
	case "yearly":
		start = time.Date(date.Year(), 1, 1, 0, 0, 0, 0, date.Location())
		end = start.AddDate(1, 0, 0)
		period = date.Format("2006")
	default: // daily
		start = time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, date.Location())
		end = start.AddDate(0, 0, 1)
		period = date.Format("2006-01-02")
		filterType = "daily"
	}

	transactions, err := s.transactionRepo.GetByUserIDAndDateRange(ctx, userID, start, end)
	if err != nil {
		return nil, err
	}

	var totalIncome, totalExpense float64
	for _, t := range transactions {
		if t.Amount > 0 {
			totalIncome += t.Amount
		} else {
			totalExpense += t.Amount
		}
	}

	return &domain.SummaryResponse{
		FilterType:   filterType,
		Period:       period,
		Transactions: transactions,
		TotalIncome:  totalIncome,
		TotalExpense: totalExpense,
		Balance:      totalIncome + totalExpense,
	}, nil
}

func (s *TransactionService) Create(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error) {
	return s.transactionRepo.Create(ctx, transaction)
}

func (s *TransactionService) Edit(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error) {
	return s.transactionRepo.Edit(ctx, transaction)
}

func (s *TransactionService) Delete(ctx context.Context, id int) error {
	return s.transactionRepo.Delete(ctx, id)
}
