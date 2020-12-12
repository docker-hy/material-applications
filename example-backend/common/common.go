package common

// FallbackString returns the second string if the first is empty. For ENVs
func FallbackString(value, fallback string) string {
	if len(value) == 0 {
		return fallback
	}

	return value
}
