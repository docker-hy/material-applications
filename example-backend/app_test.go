package main_test

import (
	"io/ioutil"
	"net/http/httptest"
	"server/router"
	"testing"
)

func TestPing(t *testing.T) {
	handler := router.Router()

	req := httptest.NewRequest("GET", "/ping", nil)
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, req)

	resp := w.Result()

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.FailNow()
	}

	responseString := string(body)

	if responseString != "pong" {
		t.Error("Response was", responseString)
	}
}
