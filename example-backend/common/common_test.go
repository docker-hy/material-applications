package common_test

import (
	"server/common"
	"testing"
)

func TestFallbackStringWithString(t *testing.T) {
	nonEmptyString := "lel"
	stringVariable := common.FallbackString(nonEmptyString, "lul")
	if stringVariable != nonEmptyString {
		t.Error("Incorrectly fell back when string was", nonEmptyString)
	}
}

func TestFallbackStringWithEmpty(t *testing.T) {
	fallBackTo := "lul"
	stringVariable := common.FallbackString("", fallBackTo)
	if stringVariable != fallBackTo {
		t.Error("Empty string was not", fallBackTo)
	}
}