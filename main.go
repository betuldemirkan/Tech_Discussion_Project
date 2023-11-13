package main

import (
	"fmt"
	"math/rand"
)

type person struct {
	row    int
	column int
}

func upFunc(u [][]int, p person, count int) int {
	for p.row > 0 {
		if u[p.row][p.column] == 2 {
			return count
		}
		p.row--
		count++
	}
	return count
}

func up_rightFunc(ur [][]int, p person, count int) int {
	for p.column != 7 && 0 < p.row {
		if ur[p.row][p.column] == 2 {
			return count
		}
		p.row--
		p.column++
		count++

	}
	return count
}

func up_leftFunc(ul [][]int, p person, count int) int {
	for 0 < p.row && p.column > 0 {
		if ul[p.row][p.column] == 2 {
			return count
		}
		p.row--
		p.column--
		count++

	}
	return count
}

func rightFunc(r [][]int, p person, count int) int {
	for p.column != 7 {
		if r[p.row][p.column] == 2 {
			return count
		}
		p.column++
		count++

	}
	return count
}

func leftFunc(l [][]int, p person, count int) int {
	for p.column > 0 {
		if l[p.row][p.column] == 2 {
			return count
		}
		p.column--
		count++
	}
	return count
}

func down_leftFunc(dl [][]int, p person, count int) int {
	for p.row != 7 && p.column > 0 {
		if dl[p.row][p.column] == 2 {
			return count
		}
		p.row++
		p.column--
		count++
	}
	return count
}

func down_rightFunc(dr [][]int, p person, count int) int {
	for p.row != 7 && p.column != 7 {
		if dr[p.row][p.column] == 2 {
			return count
		}
		p.row++
		p.column++
		count++
	}
	return count
}

func downFunc(d [][]int, p person, count int) int {
	for p.row != 7 {
		if d[p.row][p.column] == 2 {
			return count
		}
		p.row++
		count++
	}
	return count

}

func main() {
	matrix := make([][]int, 8)
	for i := 0; i < 8; i++ {
		matrix[i] = make([]int, 8)
	}

	var people = [5]person{}
	var savedCoordinates = [5]person{}

	for i := 0; i < len(people); i++ {
		people[i].row = rand.Intn(8)
		people[i].column = rand.Intn(8)
		for j := range savedCoordinates {
			if savedCoordinates[j] == people[i] && i > 0 {
				i--
				break
			}
		}
		savedCoordinates[i] = people[i]
	}

	p := people[0]

	matrix[p.row][p.column] = 1
	matrix[people[1].row][people[1].column] = 2
	matrix[people[2].row][people[2].column] = 2
	matrix[people[3].row][people[3].column] = 2
	matrix[people[4].row][people[4].column] = 2
	count := 0
	stepCount := 0
	stepCount += upFunc(matrix, p, count)
	stepCount += (up_rightFunc(matrix, p, count))
	stepCount += (rightFunc(matrix, p, count))
	stepCount += (down_rightFunc(matrix, p, count))
	stepCount += (downFunc(matrix, p, count))
	stepCount += (down_leftFunc(matrix, p, count))
	stepCount += (leftFunc(matrix, p, count))
	stepCount += (up_leftFunc(matrix, p, count))

	for i, v := range people {
		if i == 0 {
			fmt.Printf("Kahramanın koordinatları: %v,%v\n", people[0].row, people[0].column)
		} else {
			fmt.Printf("%v. düşmanın koordinatları:%v,%v\n", i, v.row, v.column)
		}
	}

	fmt.Printf("Toplam atılabilecek adım sayısı:%v\n", stepCount)

	/* 	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			fmt.Printf("%v ", matrix[i][j])
		}
		fmt.Println()
	} */

}
