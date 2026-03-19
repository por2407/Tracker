package handlers

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"

	"tracker/internal/core/domain"
	"tracker/internal/core/ports"
)

type TransactionHandler struct {
	transactionService ports.TransactionService
}

func NewTransactionHandler(transactionService ports.TransactionService) *TransactionHandler {
	return &TransactionHandler{transactionService: transactionService}
}

// GetSummaryByUserID ดึงธุรกรรมของ user พร้อมสรุปตามช่วงเวลา
// Query params:
//   - type : daily | monthly | yearly (default: daily)
//   - date : YYYY-MM-DD (default: วันนี้)
func (h *TransactionHandler) GetSummaryByUserID(c *fiber.Ctx) error {
	userID, err := strconv.Atoi(c.Params("userID"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	filterType := c.Query("type", "daily")
	if filterType != "daily" && filterType != "monthly" && filterType != "yearly" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid type. Use: daily, monthly, or yearly",
		})
	}

	dateStr := c.Query("date", time.Now().Format("2006-01-02"))
	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid date format. Use YYYY-MM-DD",
		})
	}

	summary, err := h.transactionService.GetSummaryByUserID(c.Context(), userID, filterType, date)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(summary)
}

func (h *TransactionHandler) Create(c *fiber.Ctx) error {
	var transaction domain.Transaction
	if err := c.BodyParser(&transaction); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	create, err := h.transactionService.Create(c.Context(), &transaction)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(create)
}

func (h *TransactionHandler) Edit(c *fiber.Ctx) error {
	var transaction domain.Transaction
	if err := c.BodyParser(&transaction); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	edit, err := h.transactionService.Edit(c.Context(), &transaction)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(edit)
}

func (h *TransactionHandler) Delete(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid transaction ID",
		})
	}

	if err := h.transactionService.Delete(c.Context(), id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
