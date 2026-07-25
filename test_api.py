import urllib.request
import json

base_url = "https://zyox-api.onrender.com/api/v1"

def test_api():
    # 1. Login to get token
    login_data = json.dumps({"email": "admin@zyox.com", "password": "Admin@123"}).encode('utf-8')
    req = urllib.request.Request(
        f"{base_url}/auth/login",
        data=login_data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as res:
            login_resp = json.loads(res.read().decode('utf-8'))
            print("Login success:", login_resp.get("success"))
            token = login_resp["data"]["token"]
    except Exception as e:
        print("Login failed:", e)
        return

    # 2. Get customer list without params
    req_customers = urllib.request.Request(
        f"{base_url}/customer",
        headers={"Authorization": f"Bearer {token}"},
        method="GET"
    )
    try:
        with urllib.request.urlopen(req_customers) as res:
            cust_resp = json.loads(res.read().decode('utf-8'))
            print("Get /customer without params: success =", cust_resp.get("success"))
            # Print keys of response
            print("Response keys:", list(cust_resp.keys()))
            if isinstance(cust_resp.get("data"), list):
                print("Data is a list of length:", len(cust_resp["data"]))
                if len(cust_resp["data"]) > 0:
                    print("First customer key sample:", list(cust_resp["data"][0].keys()))
            else:
                print("Data type:", type(cust_resp.get("data")))
                if isinstance(cust_resp.get("data"), dict):
                    print("Data keys:", list(cust_resp["data"].keys()))
    except Exception as e:
        print("Get /customer without params failed:", e)

    # 3. Get customer list with pagination params
    req_customers_paginated = urllib.request.Request(
        f"{base_url}/customer?page=1&limit=2",
        headers={"Authorization": f"Bearer {token}"},
        method="GET"
    )
    try:
        with urllib.request.urlopen(req_customers_paginated) as res:
            cust_resp = json.loads(res.read().decode('utf-8'))
            print("\nGet /customer?page=1&limit=2: success =", cust_resp.get("success"))
            print("Response keys:", list(cust_resp.keys()))
            if isinstance(cust_resp.get("data"), list):
                print("Data is a list of length:", len(cust_resp["data"]))
                if len(cust_resp["data"]) > 0:
                    print("First customer data sample:", cust_resp["data"][0])
            else:
                print("Data type:", type(cust_resp.get("data")))
                if isinstance(cust_resp.get("data"), dict):
                    print("Data keys:", list(cust_resp["data"].keys()))
                    print("Data docs count:", len(cust_resp["data"].get("docs", [])))
    except Exception as e:
        print("Get /customer with page/limit failed:", e)

if __name__ == "__main__":
    test_api()
