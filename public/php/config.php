<?php
	
	header("Access-Control-Allow-Origin: *");

	define("__HOST__", "localhost");
	define("__USER__", "root");
	define("__PASS__", "");
	define("__BASE__", "biblioteca");

	date_default_timezone_set("Europe/Athens");

	class DB {
		private $con = false;
		private $data = array();


			// set up database connection
			public function __construct() {
				$this->con = new mysqli(__HOST__, __USER__, __PASS__, __BASE__);
				mysqli_set_charset($this->con,"utf8");
				if(mysqli_connect_errno()) {
					die("DB connection failed:" . mysqli_connect_error());
				}
			}

			// get all classes
			public function qryPop() {
				$sql = "SELECT * FROM `clasa` ORDER BY `id_clasa` DESC";
				$qry = $this->con->query($sql);
				if($qry->num_rows > 0) {
					while($row = $qry->fetch_object()) {
						$this->data[] = $row;
					}
				} else {
					 $this->data[] = null;
				}

				$this->con->close();

				return $this->data;
			}

			//get all disciplines
			public function getAllD($sql){
				$qry = $this->con->query($sql);
				if($qry->num_rows > 0) {
					while($row = $qry->fetch_object()) {
						$this->data[] = $row;
					}
				} else {
					 $this->data[] = null;
				}

				$this->con->close();

				return $this->data;
			}

			//add disciplina
			public function addDsc($firstSql,$secondSql){
				$qry=$this->con->query($firstSql);

				if($qry->num_rows>0){
					return 0;
				}else{
					
					$this->con->query($secondSql);
					return 1;
				}
							
			}

			//account name update
			public function updateName($sql,$name,$surname,$id){


					
					$stmt=$this->con->prepare($sql);
					$stmt->bind_param("ssi", $name,$surname,$id);
					$stmt->execute();

					$this->con->close();


				



			}


			//account username update
			public function updateUName($sql,$uname,$id){


					
					$stmt=$this->con->prepare($sql);
					$stmt->bind_param("si", $uname,$id);
					$stmt->execute();

					$this->con->close();


				



			}

			//change password
			public function changePsw($sql,$newPsw,$id){

				$stmt=$this->con->prepare($sql);
				$stmt->bind_param("si",$newPsw,$id);
				$stmt->execute();
				

				$this->con->close();
			}



			//update article
			public function updateArt($sql,$title,$content,$doc,$timestamp){


				$stmt=$this->con->prepare($sql);
				$stmt->bind_param("ssss", $title,$content,$doc,$timestamp);
				$stmt->execute();

				$this->con->close();

			}

			// delete article
			public function deleteArt($sql){
				if($this->con->query($sql)===TRUE){
					return 'Successfully deleted!';
				}
				$this->con->close();
			}

			//push new article
			public function pushArt($sql=null,$titlu,$continut,$document,$clasa_disciplina,$profesor,$timestamp=null) {




			if($sql == null) {

			} else {
				$stmt=$this->con->prepare($sql);
				$stmt->bind_param("sssiis", $titlu,$continut,$document,$clasa_disciplina,$profesor,$timestamp);
				$stmt->execute();

			}
			
			
			$this->con->close();
		}

			// get all disciplines for selected class
			public function pop($sql){
				
				$qry = $this->con->query($sql);
				if($qry->num_rows > 0) {
					while($row = $qry->fetch_object()) {
						$this->data[] = $row;
					}
				} else {
					$this->data[] = null;
				}
				return $this->data;
				$this->con->close();
			}

			//get all articles with classes
			public function popDetailed($sql){


				$qry = $this->con->query($sql);
				if($qry->num_rows > 0){
					while ($row = $qry->fetch_object()) {
						$this->data[] = $row;
					}
				}else{
					$this->data[]=null;
				}
				return $this->data;
				$this->con->close();

			}

			//get all articles for selected class
			public function popArticles($firstSQL){




				

				$result = $this->con->query($firstSQL);
				$res = $result->fetch_assoc();

				$id=$res["clasa_disciplina_id"];

				
				

				$toUse="SELECT articol.*,profesor.nume_profesor,profesor.prenume
						FROM articol 
							JOIN profesor
								ON profesor=id_profesor
						WHERE clasa_disciplina=$id ORDER BY data DESC";

				$qry = $this->con->query($toUse);

				if($qry->num_rows > 0) {
					while($row = $qry->fetch_object()) {
						$this->data[] = $row;
					}
				} else {
					$this->data[] = null;
				}
				return array($this->data,$id);
				$this->con->close();
			}

			
		

			public function getUser($sql=null,$name=null,$password=null){
			$account=new stdClass();

			if(!$sql == null) {
			
				if($stmt=$this->con->prepare($sql)){
				$stmt->bind_param("ss",$name,$password);
				$stmt->execute();
				$stmt->bind_result($id,$username,$nume,$prenume,$parola,$email);
				while ($stmt->fetch())
				{	
					 $account->id=$id;
					 $account->username=$username;
					 $account->nume=$nume;
  					 $account->prenume=$prenume;
  					 $account->parola=$parola;
  					 $account->email=$email;
				};
			}
				
			}			
			return $account;
			$this->con->close();
		}

	}

?>