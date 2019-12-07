package com.csd.Services;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class DivisorService implements Result {

    private int start;
    private int end;

    HashMap<Integer, HashSet<Integer>> map;

    public DivisorService(int start, int end) {
        this.start = start;
        this.end = end;
        map = new HashMap<Integer, HashSet<Integer>>();
    }
    public DivisorService(String line) {
        String[] arr = line.split(",");

        this.start = Integer.parseInt(arr[0]);
        this.end = Integer.parseInt(arr[1]);
        map = new HashMap<Integer, HashSet<Integer>>();
    }
    public DivisorService(List<Integer> list) {
        this.start = list.get(0);
        this.end = list.get(1);
        map = new HashMap<Integer, HashSet<Integer>>();
    }

    private HashSet<Integer> getDivisors(int num){
        if(map.containsKey(num)){
            return map.get(num);
        }
        HashSet<Integer> resultSet = new HashSet<Integer>();
        resultSet.add(1);
        resultSet.add(num);
        for (int i = 2; i <= num / 2; i ++){
            if(num % i == 0){
                if(map.containsKey(i)){
                    resultSet.addAll(map.get(i));
                }else{
                    HashSet<Integer> temp = getDivisors(i);
                    map.put(i, temp);
                    resultSet.addAll(temp);
                }
            }
        }
        return resultSet;
    }

    public String getResult() {
        StringBuilder builder = new StringBuilder();
        for (int i = start; i <= end; i++) {
            HashSet<Integer> temp = getDivisors(i);
            builder.append(i);
            builder.append(": ");
            builder.append(temp.toString());
            builder.append(";    ");
        }
        return builder.toString();
    }
}
