from datetime import datetime, timedelta

def ist_to_cst(date_str, time_str):
    # Define the time difference between IST and CST
    ist_offset = timedelta(hours=11, minutes=30)  # IST is 11 hours 30 minutes ahead of CST

    # Convert the input string to datetime object in IST
    ist_datetime = datetime.strptime(date_str + ' ' + time_str, '%Y-%m-%d %H:%M')

    # Apply the IST offset to get the final datetime in CST
    cst_datetime = ist_datetime - ist_offset

    return cst_datetime.strftime('%Y-%m-%d %H:%M')

schedule = {
    "2024-02-18": ["18:30", "21:30"],
    "2024-02-19": ["07:00", "09:30", "18:30", "21:30"],
    "2024-02-20": ["18:30", "21:30"],
    "2024-02-21": ["07:00", "09:30", "18:30", "21:30"],
    "2024-02-22": ["18:30", "21:30"],
    "2024-02-23": ["07:00", "09:30", "18:30", "21:30"],
    "2024-02-24": ["19:00", "21:30"],
    "2024-02-25": ["07:00", "09:30", "18:30", "21:30"]
}

cst_schedule = {}

for date, times in schedule.items():
    cst_times = []
    for time in times:
        cst_time = ist_to_cst(date, time)
        cst_times.append(cst_time)
    cst_schedule[date] = cst_times

print(cst_schedule)


