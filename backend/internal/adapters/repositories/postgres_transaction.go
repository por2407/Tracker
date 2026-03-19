package repositories

import (
	"context"
	"time"

	"tracker/internal/core/domain"

	"gorm.io/gorm"
)

type PostgresTransactionRepo struct {
	db *gorm.DB
}

func NewPostgresTransactionRepo(db *gorm.DB) *PostgresTransactionRepo {
	return &PostgresTransactionRepo{db: db}
}

// GetByUserIDAndDateRange ดึงธุรกรรมของ user ในช่วงเวลาที่กำหนด
func (r *PostgresTransactionRepo) GetByUserIDAndDateRange(ctx context.Context, userID int, start, end time.Time) ([]*domain.Transaction, error) {
	var transactions []*domain.Transaction
	if err := r.db.WithContext(ctx).
		Where("user_id = ? AND date >= ? AND date < ?", userID, start, end).
		Find(&transactions).Error; err != nil {
		return nil, err
	}
	return transactions, nil
}

func (r *PostgresTransactionRepo) Create(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error) {
	if err := r.db.WithContext(ctx).Create(transaction).Error; err != nil {
		return nil, err
	}
	return transaction, nil
}

func (r *PostgresTransactionRepo) Edit(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error) {
	var existing domain.Transaction
	if err := r.db.WithContext(ctx).
		Where("id = ? AND user_id = ?", transaction.ID, transaction.UserID).
		First(&existing).Error; err != nil {
		return nil, err
	}

	if err := r.db.WithContext(ctx).Model(&existing).Updates(map[string]interface{}{
		"category_id": transaction.CategoryID,
		"amount":      transaction.Amount,
		"note":        transaction.Note,
		"date":        transaction.Date,
	}).Error; err != nil {
		return nil, err
	}

	return &existing, nil
}

func (r *PostgresTransactionRepo) Delete(ctx context.Context, id int) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Delete(&domain.Transaction{}).Error
}
