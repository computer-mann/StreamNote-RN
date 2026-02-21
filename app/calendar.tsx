import { DatePicker } from "@/components/nativewindui/DatePicker";
import { useState } from "react";
import { Text, View } from "react-native";

export function Calendar() {
    const [date, setDate] = useState(new Date());

    return (
        <View>
            <Text className="text-2xl font-bold mb-4">Selected Date:</Text>
            <DatePicker
                value={date}
                mode="datetime"
                onChange={(ev) => {
                    setDate(new Date(ev.nativeEvent.timestamp));
                }}

            />
        </View>
    );
}

export default Calendar;
