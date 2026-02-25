<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('farmacias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->text('direccion');
            $table->string('telefono', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('logo_url')->nullable();
            $table->time('horario_apertura')->default('08:00:00');
            $table->time('horario_cierre')->default('22:00:00');
            $table->decimal('latitud', 10, 8)->nullable();
            $table->decimal('longitud', 11, 8)->nullable();
            $table->enum('estado', ['abierta', 'cerrada', 'en_mantenimiento'])->default('abierta');
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->integer('tiempo_entrega_promedio')->default(30);
            $table->decimal('costo_envio_base', 6, 2)->default(5.00);
            $table->timestamp('fecha_registro')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmacias');
    }
};
