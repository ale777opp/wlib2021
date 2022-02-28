<?php 

$months = Array(
		0 => 'Январь',
		1 => 'Февраль',
		2 => 'Март',
		3 => 'Апрель',
		4 => 'Май',
		5 => 'Июнь',
		6 => 'Июль',
		7 => 'Август',
		8 => 'Сентябрь',
		9 => 'Октябрь',
		10 => 'Ноябрь',
		11 => 'Декабрь'
	);

echo <<<HTML
	<div id="_10" class="calendar1">
		<div class="top"><span class="arl" title="назад" onmousedown="setEventMonth(this)">&lt;</span><span id="m_10" class="$month_class" onmousedown="setEvent(this)">$months[$month_class]</span><span class="arr" title="вперед" onmousedown="setEventMonth(this)">&gt;</span><span class="arl" title="назад" onmousedown="setEventYear(this)">&lt;</span><span id="y_10" class="$year_number" onmousedown="setEvent(this)">$year_number</span><span class="arr" title="вперед" onmousedown="setEventYear(this)">&gt;</span></div>
		<div id="numeric_10">


HTML;


//for($i = 11; $i >= 0; $i--)
for($i = 0; $i <= 11; $i++)
{
	$cls='';
	if($year_number == $year)
	{
		if($i <= $month_num)
		{
			$cls=' class="u red curs" onmousedown="setEvent(\''.$year_number.'\',\''.$i.'\')"';
		}
		else
		{
			$cls='';
		}
	}
	else
	{
		$cls=' class="u red curs" onmousedown="setEvent(\''.$year_number.'\',\''.$i.'\')"';
	}
	echo '<span'.$cls.'>'.$months[$i].'</span>';
}


echo <<<HTML
		</div>
	</div>


HTML;


?>