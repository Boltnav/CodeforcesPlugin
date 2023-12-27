import requests
import json

def fetch_data():
    # raw_contest_list = requests.get("https://codeforces.com/api/contest.list?gym=false")
    raw_problems_list = requests.get("https://codeforces.com/api/problemset.problems")
    if raw_problems_list.status_code != 200:
        print("Failed to fetch contests")  
        exit(1)

    problems_list = raw_problems_list.json()
    problems = problems_list['result']['problems']

    # print(raw_problems_list)
    # print(problems_list)
    # print(problems)

    # print(len(problems))

    # for i in range(len(problems)):
    #     print(problems[i])
    #     print("\n")

    # key = 'points'
    # for i in range(100):
    #     if (key in problems[i].keys()):
    #         print("name = ", problems[i]['name'], "| points =", problems[i]['points'])
    #     else:
    #         print("doesn't exist")

    contestwise_list = []
    local_list = []
    for i in range(len(problems)):
        local_list.append(problems[i])
        if (problems[i]['index'] == 'A'):       # Handle with care - the ending few problems won't be added unless they end at A
            contestwise_list.append(local_list)
            local_list = []

    # print(contestwise_list)
    return contestwise_list

def save_data(data, filename='codeforces_data.json'):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == '__main__':
    data = fetch_data()
    save_data(data)