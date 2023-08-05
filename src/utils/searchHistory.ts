import AsyncStorage from '@react-native-async-storage/async-storage';
interface History {
  date: Date;
  search: string;
}
export async function getSearchHistory(): Promise<History[]> {
  try {
    const history = await AsyncStorage.getItem('SEARCH_HISTORY');
    if (!history) {
      return [];
    }

    return sortArrayByDate(JSON.parse(history));
  } catch (e) {
    return [];
  }
}

export async function updateSearchHistory(search: string) {
  const history = await getSearchHistory();
  const historyNoDuplicate = history.filter(
    item => item.search.toLowerCase() !== search.toLowerCase(),
  );
  if (historyNoDuplicate.length > 5) {
    historyNoDuplicate.pop();
  }

  historyNoDuplicate.push({
    search,
    date: new Date(),
  });
  await AsyncStorage.setItem(
    'SEARCH_HISTORY',
    JSON.stringify(historyNoDuplicate),
  );
}

function sortArrayByDate(array: any) {
  return array.sort(function (a: any, b: any) {
    return new Date(b.date) - new Date(a.date);
  });
}
